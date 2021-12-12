/* eslint eqeqeq: 0 */
import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';
import { useAuth } from '../hooks/useAuth';
import { toastMensagem } from '../hooks/useMensagem';
import { database } from '../services/firebase';
import '../styles/room.scss';
import { useRoom } from '../hooks/useRoom';


export function Room(){
    
    const [newQuestion,setNewQuestion] = useState('');
    const {user,signInWithGoogle} = useAuth();
    const params = useParams() ;
    const roomId = params.id!;
    const {title,questions} = useRoom(roomId);

     async function handleSendQuestion(event: FormEvent){
        event.preventDefault();
        if(newQuestion.trim() == ''){
            return toastMensagem('Digite uma pergunta');
        }
        if(!user){
            return toastMensagem('Você precisa está logado para criar uma pergunta');
        }
        const question = {
            content: newQuestion,
            author:{
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted:false,
            isAnswered:false
        }
        await database.ref(`rooms/${roomId}/questions`).push(question);
        setNewQuestion('');
        return toastMensagem('Pergunta enviada!');
    }
    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask LOL" />
                    <RoomCode code={params.id!}/>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                <form onSubmit={handleSendQuestion}>
                    <textarea placeholder="O que você quer perguntar?"
                    onChange={event=>setNewQuestion(event.target.value)}
                    value={newQuestion} />
                    <div className="form-footer">
                        {user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) 
                        : 
                        (<span>Para enviar uma pergunta, <button className="button-login" onClick={signInWithGoogle}>faça seu login</button></span>
                        )
                        }
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>
                <div className="question-list">
                    {questions.map(question =>{
                        return(
                                <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                />
                        )
                    })}
                </div>

            </main>
        </div>
    );
}