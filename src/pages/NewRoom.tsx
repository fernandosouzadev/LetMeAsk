/* eslint eqeqeq: 0 */
import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import '../styles/auth.scss';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import { toastMensagem } from '../hooks/useMensagem';

export function NewRoom(){
    const navigate = useNavigate();
    const { user } = useAuth();
    const [newRoom,setNewRoom] = useState('');
    async function handleCreateRoom(event:FormEvent){
        event.preventDefault();

        if (newRoom.trim() == ''){
            
            return toastMensagem('Digite o nome de sala!');
        }
        const roomRef = database.ref('rooms')
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
            nome: user?.name
        });
        navigate(`/rooms/${firebaseRoom.key}`); 
        toastMensagem('Sala Criada!'); 
    };

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
                    <div className='usuario'>
                        <img className='avatar' src={user?.avatar} alt=""/>
                        <h2 className='name'>{user?.name}</h2>
                    </div>
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit" >
                            Criar na sala
                        </Button>
                        <p>Quer entrar em uma sala já existente? <Link to="/">Clique aqui</Link></p>
                    </form>
                </div>
            </main>

        </div>
    )

}