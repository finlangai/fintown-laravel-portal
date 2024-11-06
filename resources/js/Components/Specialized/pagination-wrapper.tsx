import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/Specialized/pagination-inertia";
import { cn } from "@/Lib/utils";

type PaginationWrapperProps<paginateModelType> = {
  paginationData: Pagination<paginateModelType>;
} & classNameInterface;

export const PaginationWrapper = <T,>({
  paginationData,
  className,
}: PaginationWrapperProps<T>) => {
  const paginationLinks = paginationData.links.slice();
  const prevLink = paginationLinks.shift();
  const nextLink = paginationLinks.pop();
  return (
    <Pagination className={cn("mx-0 w-fit", className)}>
      <PaginationContent className="gap-2">
        {/* PREVIOUS BUTTON */}
        <PaginationItem>
          <PaginationPrevious
            href={prevLink?.url ?? paginationData.last_page_url}
          />
        </PaginationItem>
        {paginationLinks.map(
          ({ active, label, url }: PaginationLink, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href={url ?? ""}
                isActive={active}
                dangerouslySetInnerHTML={{ __html: label }}
              />
            </PaginationItem>
          ),
        )}
        {/* PREVIOUS BUTTON */}
        <PaginationItem>
          <PaginationNext
            href={nextLink?.url ?? paginationData.first_page_url}
            isActive={nextLink?.active}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
