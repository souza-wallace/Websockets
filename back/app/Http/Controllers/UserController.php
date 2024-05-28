<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\ChangedUser;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function edit($id, Request $request){
        $capacidade = $request->capacidades;
        // return implode(',',$capacidade);

        $user = DB::table('users')
        ->join('cargos', 'users.cargos_id', '=', 'cargos.id')
        ->select('users.*', 'cargos.capacidades')
        ->where('users.id', $id)
        ->first();

        if ($user) {
            // Decodifica o JSON de capacidades para um array PHP
            $capacidades = json_decode($user->capacidades, true);
    
            // Verifica se a capacidade já existe no array
            if (in_array($capacidade, $capacidades)) {
                echo 'remove';
                // Remove a capacidade se ela já estiver no array
                $capacidades = array_filter($capacidades, function($item) use ($capacidade) {
                    return $item != $capacidade;
                });
            } else {
                echo 'add';

                // Adiciona a capacidade se ela não estiver no array
                $capacidades[] = $capacidade;
            }
            
            // Codifica o array de volta para JSON
            $capacidadesJson = json_encode(array_values($capacidades)); // array_values para reindexar
    
            // Atualiza o registro no banco de dados
            DB::table('cargos')
                ->where('id', $user->cargos_id)
                ->update(['capacidades' => $capacidadesJson]);
        }

        $data = [
            "id" => $id,
            "capacidades" => $capacidadesJson
        ];

        event(new ChangedUser($data));

        return 'user has been edit';
    }
}
