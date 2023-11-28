import axios from "axios"
import Image from "next/image"
import { useEffect } from "react"
import { useState } from "react"
import { AiFillCloseCircle } from "react-icons/ai"
import { IoAddCircleSharp } from "react-icons/io5";
import style from "./style.module.css"
export function ModalDieta({ title, categoria }) {
    const [comidas, setComidas] = useState()
    const [modal, setModalIsOpen] = useState(true)

    const closeModal = () =>{
        setModalIsOpen(false)
    }

    useEffect(() => {
        const GetComidas = () => {
            let url = `https://api-bebevindo.azurewebsites.net/refeicao/lista/alimento`

            axios.get(url).then((response) => {
                const data = response.data
                setComidas(data)
            }).catch(console.log("erro"))
        }
        GetComidas()
    }, [])

    return (
        <>
            <div className={style.containerModal}>
                <div className={style.containerController}>
                    <div className={style.contentModal}>
                        <div className={style.headerModal}>
                            <AiFillCloseCircle onClick={closeModal} fill="#FF0000" />
                        </div>
                        <h1>
                            {title}
                        </h1>
                        <h2>
                            Aqui você pode selecionar os alimentos que irão entrar na dieta:
                        </h2>


                        <div className={style.foods}>
                            <div className={style.boxFood}>
                                {comidas?.alimentos?.map((data) => {
                                    return (
                                        <>
                                            <div className={style.foodItem}>
                                                <div className={style.imageFood}>
                                                    <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={data?.imagem} alt="" />
                                                </div>
                                                <div className={style.foodInformations}>
                                                    <span>
                                                        {data?.nome}

                                                    </span>
                                                    <IoAddCircleSharp fill="#b6b6f6" fontSize={"1.5rem"}/>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}