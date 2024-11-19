import { sql } from "@vercel/postgres";
import { ProjectTable } from "@/types/definitions";
import { unstable_noStore as noStore } from "next/cache";

const PROJECTS_PER_PAGE = 6;

export async function fetchFilteredProjectsSimple(
  query: string,
  currentPage: number,
  email: string
) {
  noStore();

  const offset = (currentPage - 1) * PROJECTS_PER_PAGE;

  try {
    const projects = await sql<ProjectTable>`
      SELECT
        projects.id,
        projects.name,
        projects.website_url
      FROM projects
      WHERE
        projects.name ILIKE ${`%${query}%`} AND
        user_email = ${email}
      ORDER BY projects.name DESC
      LIMIT ${PROJECTS_PER_PAGE} OFFSET ${offset}
    `;
    return projects.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch project metrics.");
  }
}

export async function fetchProjectById(id: string) {
  noStore();

  try {
    const data = await sql<ProjectTable>`
      SELECT
        projects.id,
        projects.name,
        projects.website_url
      FROM projects
      WHERE projects.id = ${id};
    `;

    const project = data.rows.map((project) => ({
      ...project,
    }));

    // console.log(project[0]);
    return project[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoice.");
  }
}

export async function fetchProjectsPages(query: string, email: string) {
  noStore();

  try {
    const count = await sql`SELECT COUNT(*)
    FROM projects
    WHERE
      (projects.name ILIKE ${`%${query}%`} OR
      projects.website_url ILIKE ${`%${query}%`}) AND
      projects.user_email = ${email}
  `;

    const totalPages = Math.ceil(
      Number(count.rows[0].count) / PROJECTS_PER_PAGE
    );
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of projects.");
  }
}
