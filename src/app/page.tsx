import { getAllModules, getPhases } from "@/lib/curriculum";
import { LandingPage } from "@/components/marketing/LandingPage";

export default async function HomePage() {
  // const phases = getPhases();
  const modules = getAllModules();
  const submoduleCount = modules.reduce(
    (n, m) => n + m.submodules.length,
    0
  );

  let result: any = null;
  let baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const token = "accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YTA4MWI4MTM2YjI4NzJmYzk5NjdjMjYiLCJlbWFpbCI6ImFkaXR5YTExMkBnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc4MDEzMTc1MywiZXhwIjoxNzgwNzM2NTUzfQ.hhPiWUrifjyEOoo_3y5ar9LWxjOVBIK9j7daTDjlELc; Path=/; HttpOnly; Expires=Sat, 06 Jun 2026 09:02:31 GMT";
  const response = await fetch(`${baseURL}/api/academy-overview`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Cookie": token,
      "Content-Type": "application/json",
    },
  });
  try {
    if (!response.ok) {
      throw new Error(`Response Status : ${response.status}`);
    }
    result = await response.json();
    console.log("mjhujkk", result);
  } catch (error: any) {
    console.error(error?.message ?? error);
  }

  const overview = Array.isArray(result) ? result[0] : result;
  const phases = overview?.phases ?? getPhases();
  const moduleCountOverride = overview?.modules?.length ?? modules.length;
  const submoduleCountOverride = overview?.submoduleCount ?? submoduleCount;

  return (
    <LandingPage
      phases={phases}
      moduleCount={moduleCountOverride}
      submoduleCount={submoduleCountOverride}
    />
  );
}
