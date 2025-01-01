<?php

namespace App\Http\Requests\Equipment;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\StatusEnum;

class StoreEquipmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules() : array
    {
        return [
            'equipName' => 'required|string|max:255',
            'equipType' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            //'acquired_date' => 'required|date',
            'acquired_date' => 'required|date_format:Y-m-d',
            'status' => ['required', 'string', 'in:' . implode(',', StatusEnum::getValues())], 
        ];
    }

    public function messages()
    {
        return [
            'equipName.required' => 'Nama Peralatan diperlukan!',
            'equipType.required' => 'Jenis diperlukan!',
            'location.required' => 'Lokasi diperlukan!',
            'acquired_date.required' => 'Tarikh Diperolehi diperlukan!',
            'status.required' => 'Status diperlukan!',
        ];
    }
}
