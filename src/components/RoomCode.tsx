import copyImg from '../assets/images/copy.svg';
import { toastMensagem } from '../hooks/useMensagem';
import '../styles/room-code.scss';


type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps){
    function copyRoomCodeToClipboard(){
        navigator.clipboard.writeText(props.code)
        toastMensagem('Código Copiado!');
    }
    return(
        <button className='room-code' onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copiar código da sala" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}