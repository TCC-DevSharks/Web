import React, { useEffect, useState } from "react";
import styles from "../Dieta.module.css";
import axios from "axios";
import { IoAddCircleSharp, IoRemoveCircleSharp } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ModalAddFoodRefeicao({
  refeicao,
  idRefeicao,
  closeRefeicoesModal,
}) {
  const [alimentos, setAlimentos] = useState([]);
  const [todosAlimentos, setTodosAlimentos] = useState([]);
  const [mostrarTodosAlimentos, setMostrarTodosAlimentos] = useState(false);
  const [listaSelecionados, setListaSelecionados] = useState([]);
  const [adicionandoAlimentos, setAdicionandoAlimentos] = useState(false);

  const getAlimentosDaRefeicao = (idRefeicao) => {
    const url = `https://api-bebevindo.azurewebsites.net/refeicao/alimento/${idRefeicao}`;

    axios
      .get(url)
      .then((response) => {
        const data = response.data;

        if (!data.alimentos || !Array.isArray(data.alimentos)) {
          console.error(
            "Os dados não contêm a propriedade 'alimentos' ou não são uma array:",
            data
          );
          setAlimentos([]);
          return;
        }

        console.log(data);
        setAlimentos(data.alimentos);
      })
      .catch((err) => {
        console.error("Erro ao obter dados:", err);
        setAlimentos([]);
      });
  };

  const getTodosAlimentos = () => {
    const url =
      "https://api-bebevindo.azurewebsites.net/refeicao/lista/alimento";

    axios
      .get(url)
      .then((response) => {
        const data = response.data;

        if (!Array.isArray(data.alimentos)) {
          console.error("Os dados não são uma array:", data);
          setTodosAlimentos([]);
          return;
        }

        console.log(data);
        setTodosAlimentos(data.alimentos);
        setMostrarTodosAlimentos(true);
      })
      .catch((err) => {
        console.error("Erro ao obter dados:", err);
        setTodosAlimentos([]);
      })
      .finally(() => {
        setAdicionandoAlimentos(true);
      });
  };

  const adicionarNaLista = (alimento) => {
    setListaSelecionados((prevLista) => {
      if (!prevLista.some((item) => item.id === alimento.id)) {
        setTimeout(() => {
          toast.success(`Alimento ${alimento.nome} foi adicionado!`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }, 500); 

        return [...prevLista, alimento];
      } else {
        setTimeout(() => {
          toast.warning(`O Alimento ${alimento.nome} já está na lista!`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }, 500); 

        return prevLista;
      }
    });
  };

  const removerDaLista = (alimento) => {
    const novaLista = listaSelecionados.filter(
      (item) => item.id !== alimento.id
    );
    setListaSelecionados(novaLista);
  };

  useEffect(() => {
    getAlimentosDaRefeicao(idRefeicao);
  }, [idRefeicao]);

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
      <div className={styles["modalContainerRefeicoes"]}>
        <div className={styles["modalBox"]}>
          <div className={styles["modalContentRefeicoes"]}>
            <span
              onClick={() => closeRefeicoesModal()}
              className={styles["closeButtonModal"]}
            >
              &times;
            </span>

            <h2>{refeicao}</h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                maxHeight: "80%",
                overflow: "auto",
                paddingTop: "5%",
                paddingBottom: "5%",
              }}
            >
              {mostrarTodosAlimentos ? (
                todosAlimentos.map((alimento, index) => (
                  <div
                    key={index}
                    style={{
                      width: "150px",
                      margin: "10px",
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      textAlign: "center",
                    }}
                  >
                    <img
                      src={alimento.imagem}
                      alt={alimento.nome}
                      style={{
                        width: "100%",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                    <p style={{ margin: "8px 0", fontSize: "14px" }}>
                      {alimento.nome}
                    </p>
                    {adicionandoAlimentos ? (
                      <IoAddCircleSharp
                        onClick={() => adicionarNaLista(alimento)}
                      />
                    ) : (
                      <IoRemoveCircleSharp
                        onClick={() => removerDaLista(alimento)}
                      />
                    )}
                  </div>
                ))
              ) : alimentos.length === 0 ? (
                <>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ fontSize: "1.4rem" }}>
                      Nenhum alimento nesta refeição!
                    </p>
                  </div>
                </>
              ) : (
                alimentos.map((alimento, index) => (
                  <div key={index}>
                    <h1>{alimento.nome}</h1>
                    {adicionandoAlimentos ? (
                      <IoAddCircleSharp
                        onClick={() => adicionarNaLista(alimento)}
                      />
                    ) : (
                      <IoRemoveCircleSharp
                        onClick={() => removerDaLista(alimento)}
                      />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              width: "80%",
            }}
          >
            {adicionandoAlimentos ? (
              <>
                <button onClick={() => setAdicionandoAlimentos(false)}>
                  Cancelar
                </button>
                <button onClick={() => setAdicionandoAlimentos(false)}>
                  Salvar
                </button>
              </>
            ) : (
              <button onClick={getTodosAlimentos}>Adicionar alimentos</button>
            )}
            <button>Copiar refeição</button>
          </div>
        </div>
      </div>
    </>
  );
}
