import Banner from "@/features/landing/Projects/Banner";
import Container from "@/features/landing/Projects/Container";
import { ProjectsRoute } from "@/lib/routes/apiRoutes";
import { getData } from "@/lib/services/data";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const ProjectsPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [ProjectsRoute.getAll()],
    queryFn: ({ pageParam = 1 }) =>
      getData(
        ProjectsRoute.getAll({
          page: pageParam,
          limit: 9,
        }),
      ),
    initialPageParam: 1,
  });

  return (
    <section>
      <Banner />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Container />
      </HydrationBoundary>
    </section>
  );
};

export default ProjectsPage;
