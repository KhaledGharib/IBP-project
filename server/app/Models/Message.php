<?php

namespace App\Models;

use App\User;
use App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = ['message'];

    public function user()
    {
        return $this->belongsTo(User);
    }
}
