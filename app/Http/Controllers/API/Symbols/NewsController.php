<?php

namespace App\Http\Controllers\API\Symbols;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\NewsRequest;
use App\Models\Mongo\Company\News;
use App\Traits\Swagger\Symbols\NewsAnnotation;
use App\Utils\ApiResponse;

class NewsController extends Controller
{
    use NewsAnnotation;
    public function __invoke(string $symbol, NewsRequest $request)
    {
        $validated = $request->validated();
        $newsLimit = 20;

        $query = News::where("symbol", strtoupper($symbol))->orderBy(
            "publish_date",
            "desc"
        );

        if (array_key_exists("limit", $validated)) {
            $newsLimit = $validated["limit"];
        }

        if (array_key_exists("offset", $validated)) {
            $query->skip($validated["offset"]);
        }

        $query->limit($newsLimit);
        $query->project($this->getNewsProjection());

        $news = $query->get();

        // GUARD - handle zero length collection
        if (!$news->count()) {
            return ApiResponse::notFound("Không tìm thấy sự kiện.");
        }

        $news = $news->toArray();
        foreach ($news as $index => $n) {
            $news[$index]["publishDate"] = $n["publishDate"]->format("d/m/Y");
        }

        return ApiResponse::success($news);
    }

    private function getNewsProjection(): array
    {
        return [
            "title" => 1,
            "publishDate" => "\$publish_date",
            "price" => [
                "value" => "\$price",
                "change" => "\$price_change",
                "changeRatio" => "\$price_change_ratio",
            ],
        ];
    }
}
