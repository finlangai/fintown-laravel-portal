<?php

namespace App\Http\Controllers\API\General;

use App\Actions\GetNotificationList;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\General\GetNotificationListRequest;
use App\Models\SQL\System\Notification;
use App\Models\SQL\System\NotificationReaded;
use App\Services\AblyService;
use App\Utils\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NotificationController extends Controller
{
    public function __construct(private AblyService $ably)
    {
    }

    public function index(
        GetNotificationListRequest $request,
        GetNotificationList $action
    ) {
        $validated = $request->validated();
        $result = $action->handle($validated);

        return ApiResponse::success($result);
    }

    public function tokenGenerate()
    {
        $userId = auth("api")->id();
        return $this->ably->generateAuthToken($userId);
    }

    public function markAsRead()
    {
        $notificationUuids = request()->validate(["uuids" => "required|array"])[
            "uuids"
        ];

        $existingNotifications = Notification::whereIn("id", $notificationUuids)
            ->pluck("id")
            ->toArray();

        $userId = auth("api")->id();

        foreach ($existingNotifications as $uuid) {
            NotificationReaded::firstOrCreate([
                "notification_id" => $uuid,
                "user_id" => $userId,
            ]);
        }

        return ApiResponse::success([
            "message" => "Đã đánh dấu đã đọc cho các thông báo.",
        ]);
    }
}
