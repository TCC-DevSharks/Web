import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { AiFillCloseCircle } from "react-icons/ai"
import style from "./style.module.css"
export function ModalDieta({ title, categoria }) {
    const [comidas, setComidas] = useState()

    const GetComidas = (categoria) => {
        let url = `https://api-bebevindo.azurewebsites.net/dieta/categoria/${categoria}`

        axios.get(url).then((response) => {
            const data = response.data
            console.log(data);
            setComidas(data)
        }).catch(console.log("erro"))
    }

    useEffect(() => {
        GetComidas()
    })

    return (
        <>
            <div className={style.containerModal}>
                <div className={style.containerController}>
                    <div className={style.contentModal}>
                        <div className={style.headerModal}>
                            <AiFillCloseCircle fill="#FF0000" />
                        </div>
                        <h1>
                            {title}
                        </h1>
                        <div className={style.foods}>
                            <h2>
                                Aqui você pode selecionar os alimentos que irão entrar na dieta:
                            </h2>
                            <div className={style.boxFood}>
                                <div className={style.foodItem}>
                                    <div className={style.imageFood}>
                                        <img src="" alt="" />
                                    </div>
                                    <div className={style.foodInformations}>
                                        <span>
                                            Nome: 
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}