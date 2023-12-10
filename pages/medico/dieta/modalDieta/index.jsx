import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { AiFillCloseCircle } from "react-icons/ai"
import { IoAddCircleSharp } from "react-icons/io5";
import style from "./style.module.css";
import image from "../../../../assets/image.png"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const ModalDieta = ({ title, id_dieta, id_profissional,id_gestante, closeModal }) => {



  // console.log(id_profissional);
  console.log(id_dieta + "ID");
  
  const [comidas, setComidas] = useState();
  const [modal, setModalIsOpen] = useState(true);
  const [nomeRefeicao, setNomeRefeicao] = useState()
  const [horarioRefeicao, setHorarioRefeicao] = useState()

  const url = `https://api-bebevindo.azurewebsites.net/dieta/refeicao`
  const postRefeicao = () => {
    axios.post(url,{
      id_dieta: id_dieta,
      id_profissional: id_profissional,
      horario: horarioRefeicao,
      id_gestante: id_gestante.idGestante,
      nome: nomeRefeicao

    }).then(response => {
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
    }).catch(err => {
      console.log(err);
      toast.error("Por favor preecha todos os campos ", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })
  }

  return (
    <>
    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
      {modal && (
        <div className={style.containerModal}>
          <div className={style.containerController}>
            <div className={style.contentModal}>
              <div className={style.headerModal}>
                <AiFillCloseCircle onClick={closeModal} fill="#FF0000" style={{ cursor: 'pointer' }}/>
              </div>
              <h1>{title}</h1>
              <p>Aqui você pode criar a refeição, digitando o nome e o horário da refeição</p>

              <div className={style.foods}>
                <label  htmlFor="Nome refeição">
                  Nome da refeição:
                  <input required value={nomeRefeicao} onChange={() => {setNomeRefeicao(event.target.value)}} className={style.inputName} type="text" name="Nome" id="nome" placeholder="Digite o nome da refeição" />
                </label>
                <label  htmlFor="Horário refeição">
                  Horário da refeição:
                  <input required value={horarioRefeicao} onChange={()=> {setHorarioRefeicao(event.target.value)}} className={style.inputTime} type="time" name="Horario" id="nome"  />
                </label>
                <img className={style.teste} src={image.src} alt="Três medicos" />
              <button onClick={postRefeicao} className={style.buttonCriar}>Criar refeição</button>
              </div>  
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalDieta
