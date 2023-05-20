<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizAnswer extends Model
{
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $fillable = ['quiz_id', 'start_date', 'end_date'];

    public function quiz()
    {
        return $this->belongsTo(quiz::class);
    }
}
