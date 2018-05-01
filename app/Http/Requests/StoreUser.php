<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUser extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'username' => "required",
            'firstname' => "required",
            'lastname'=> "required",
            'password' => "required_if:new,==,true",

        ];
    }

    public function messages()
    {
        return [
            'password.required_if' =>  'Password is required.'
        ];
    }
}
