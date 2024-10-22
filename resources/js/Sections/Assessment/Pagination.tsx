import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/UI/pagination-inertia";
import { AssessmentProps } from "@/Pages/Assessment/Assessment";

export function AssessmentPagination({ paginationData }: AssessmentProps) {
  const paginationLinks = paginationData.links.slice();
  const prevLink = paginationLinks.shift();
  const nextLink = paginationLinks.pop();
  return (
    <Pagination className="mx-0 w-fit">
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
}
