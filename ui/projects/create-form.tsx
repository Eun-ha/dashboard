"use client";
import { createProject } from "@/backend/project-actions";
import {
  AtSymbolIcon,
  DocumentIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";
import { Button } from "../component/Button";

export default function Form() {
  const initialState = { errors: {}, message: "" };
  const [state, dispatch] = useFormState(createProject, initialState);
  const [websiteUrl, setWebsiteUrl] = useState("https://");

  return (
    <form action={dispatch}>
      <div className="p-4 rounded-md bg-gray-50 md:p-6">
        {/* Project Name */}
        <div className="mb-4">
          <label htmlFor="amount" className="block mb-2 text-lg font-medium">
            프로젝트 이름
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter project name"
                required
                className="block w-full py-2 pl-10 text-sm border border-gray-200 rounded-md peer outline-2 placeholder:text-gray-500"
              />
              <DocumentIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div
            className="flex items-end h-8 space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.message && (
              <>
                <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
                <p className="text-sm text-red-500">{state.message}</p>
              </>
            )}
          </div>
        </div>

        {/* 프로젝트 주소 */}
        <div className="mb-4">
          <label htmlFor="amount" className="block mb-2 text-lg font-medium">
            프로젝트 주소
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="website_url"
                name="website_url"
                type="text"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="Enter project web url"
                className="block w-full py-2 pl-10 text-sm border border-gray-200 rounded-md peer outline-2 placeholder:text-gray-500"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <Link
          href="/dashboard/projects"
          className="flex items-center h-10 px-4 text-sm font-medium text-gray-600 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          취소
        </Link>
        <Button type="submit">생성하기</Button>
      </div>
    </form>
  );
}
