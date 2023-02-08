<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class historico extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'historico';
    protected $fillable = ['id', 'nombres','valores', 'Fecha'];

}
