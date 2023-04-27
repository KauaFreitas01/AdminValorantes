import { http } from './ApiConfig.'

export default {
    listar:() => {
        return http.get('matchs/get')
    }
}