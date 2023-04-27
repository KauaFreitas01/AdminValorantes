import { http } from './ApiConfig.'

export default {
    listar:() => {
        return http.get('teams/get')
    }
}