/* eslint eqeqeq: 0 */
import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import googleImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { toastMensagem } from '../hooks/useMensagem';
import { database } from '../services/firebase';


export function Home(){
    const navigate = useNavigate();
    const { signInWithGoogle, user } = useAuth();
    const [ roomCode , setRoomCode ] = useState('');
    async function handleCreateRoom(){
        if (!user){
            await signInWithGoogle()
        }
        navigate('/rooms/new');
    }
    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();
        if (roomCode.trim() === ''){
            return toastMensagem('Digite o código de sala!');
        }        
        
        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()){
            toastMensagem('Sala não existe!')
            return;
        }
        navigate(`/rooms/${roomRef.key}`);

        const roomTitle = database.ref(`rooms/${roomCode}`).once('value', function (snapshot) {
                 return snapshot.val().title
            }); 
        toastMensagem(`Você entrou na sala [ ${(await roomTitle).val().title} ]`); 
    }
    return(
        <div id="page-auth">

            <aside>
                <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire suas dúvidas ao vivo!</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Logo da Let me ask" />
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={googleImg} alt="Logo do Google" />
                        Crie sua sala com o google
                    </button>
                    <div className="separator"> Ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}