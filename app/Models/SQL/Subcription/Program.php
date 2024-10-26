<?php

namespace App\Models\SQL\Subcription;

use App\Models\SQL\User\Type;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use MongoDB\Laravel\Relations\BelongsTo;
use MongoDB\Laravel\Relations\HasMany;
use Illuminate\Support\Str;
class Program extends Model
{
    use HasFactory;

    protected $table = 'subcription_programs';
    public $incrementing = false;
    protected $fillable = [
        'id',
        'incharge_id',
        'name',
        'description',
        'price',
        'discount',
        'duration',
        'duration_type',
        'is_renewable'
    ];
    protected static function boot() {
        parent::boot();
        static::creating(function ($program) {
            if (empty($program->id)) { // Nếu ID chưa có, thì tự động tạo
                $program->id = self::generateUniqueId();
            }
        });
    }

    private static function generateUniqueId()
    {
        do {
            $id = Str::upper(Str::random(5)); // Tạo chuỗi 5 ký tự in hoa
        } while (self::where('id', $id)->exists());

        return $id;
    }

    public function incharge(): BelongsTo
    {
        return $this->belongsTo(Type::class, 'incharge_id', 'id');
    }

    public function subcriptions(): HasMany
    {
        return $this->hasMany(Subcription::class, "program_id");
    }

    public function promotionCodes(): HasMany
    {
        return $this->hasMany(PromotionCode::class, 'program_id');
    }
}
