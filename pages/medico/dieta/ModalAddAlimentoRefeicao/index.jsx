import React, { useEffect, useState, useRef } from "react";
import styles from "../Dieta.module.css";
import axios from "axios";
import { IoAddCircleSharp, IoRemoveCircleSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { AiFillCloseCircle } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";

 function RefeicaoCard({ imagem, nome, onClick, removerDaLista }) {
  return (
    <div
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
        src={imagem}
        alt={nome}
        style={{
          width: "100%",
          height: "100px",
          objectFit: "cover",
          borderRadius: "4px",
        }}
      />
      <p style={{ margin: "8px 0", fontSize: "14px" }}>{nome}</p>
      <IoAddCircleSharp onClick={onClick} />
      <IoRemoveCircleSharp onClick={() => removerDaLista()} />
    </div>
  );
}

 function ModalAddFoodRefeicao({
  refeicao,
  idRefeicao,
  closeRefeicoesModal,
  refeicaoPadrao,
}) {
  const [alimentos, setAlimentos] = useState([]);
  const [todosAlimentos, setTodosAlimentos] = useState([]);
  const [mostrarTodosAlimentos, setMostrarTodosAlimentos] = useState(false);
  const [listaSelecionados, setListaSelecionados] = useState([]);
  const [adicionandoAlimentos, setAdicionandoAlimentos] = useState(false);
  const [copiandoRefeicao, setCopiandoRefeicao] = useState(false);
  const toastDisplayed = useRef(false);
  let IdMedico;
  if (typeof window !== "undefined") {
    IdMedico = localStorage.getItem("id");
  }

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
      if (!Array.isArray(prevLista)) {
        prevLista = [];
      }

      if (prevLista.some((item) => item.id === alimento.id)) {
        if (!toastDisplayed.current) {
          toastDisplayed.current = true;

          toast.warning(`O Alimento ${alimento.nome} já está na lista!`, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setTimeout(() => {
            toastDisplayed.current = false;
          }, 1500);
        }

        return prevLista;
      }

      if (!toastDisplayed.current) {
        toastDisplayed.current = true;

        setTimeout(() => {
          toast.success(`Alimento ${alimento.nome} foi adicionado!`, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }, 100);

        setTimeout(() => {
          toastDisplayed.current = false;
        }, 1000);
      }

      return [...prevLista, alimento];
    });
  };

  const removerDaLista = (alimento) => {
    setListaSelecionados((prevLista) => {
      const novaLista = prevLista.filter((item) => item.id !== alimento.id);
      toast.success(`Alimento ${alimento.nome} foi removido!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return novaLista;
    });
  };

  const deleteLista = (idRefeicao, idAlimento) => {
    console.log(idAlimento.idAlimento);
    const url = `https://api-bebevindo.azurewebsites.net/refeicao/${idRefeicao}/alimento/${idAlimento.idAlimento}`;

    axios
      .delete(url)
      .then((response) => {
        console.log(response.data);
        getAlimentosDaRefeicao(idRefeicao);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const PostAlimentoRefeicao = (alimento, idRefeicao) => {
    if (!Array.isArray(alimento) || alimento.length === 0) {
      console.error("Dados do alimento inválidos:", alimento);
      return;
    }
    alimento.forEach((item) => {
      if (!item.id) {
        console.error("ID do alimento ausente:", item);
        return;
      }

      console.log("Dados Enviados:", {
        id_alimento: item.id,
        id_refeicao: idRefeicao,
      });

      const url = `https://api-bebevindo.azurewebsites.net/refeicao/alimento`;

      axios
        .post(url, {
          id_alimento: item.id,
          id_refeicao: idRefeicao,
        })
        .then((response) => {
          closeRefeicoesModal();
        })
        .catch((err) => {
          console.log("Erro na Solicitação:", err);
          console.log("Detalhes do Erro:", err.response.data);
        });
    });
  };

  const handleCopyRefeicao = () => {
    setCopiandoRefeicao(true);

    // Adicione a lógica aqui para exibir a mensagem de funcionalidade em breve
    toast.info("Essa funcionalidade estará disponível em breve!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setCopiandoRefeicao(false);
  };

  useEffect(() => {
    getAlimentosDaRefeicao(idRefeicao);
  }, [idRefeicao]);

  return (
    <>
      <div className={styles["modalContainerRefeicoes"]}>
        <div className={styles["modalBox"]}>
          <div className={styles["modalContentRefeicoes"]}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <AiFillCloseCircle
                fill="#FF0000"
                onClick={() => closeRefeicoesModal()}
                style={{ cursor: "pointer", fontSize: "1.6rem" }}
              />
            </div>

            <h2>{refeicao}</h2>
            <p>Aqui você pode ver os alimentos de sua refeição</p>
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
                  <RefeicaoCard
                    key={index}
                    imagem={alimento.imagem}
                    nome={alimento.nome}
                    onClick={() => adicionarNaLista(alimento)}
                    removerDaLista={() => removerDaLista(alimento)}
                  />
                ))
              ) : alimentos.length === 0 ? (
                <>
                  <div
                    style={{
                      width: "100%",
                      height: "500px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ fontSize: "1.8rem", color: "#000" }}>
                      Nenhum alimento nesta refeição!
                    </p>
                  </div>
                </>
              ) : (
                alimentos.map((alimento, index) => (
                  <RefeicaoCard
                    key={index}
                    imagem={alimento.imagem}
                    nome={alimento.nome}
                    onClick={() => PostAlimentoRefeicao(alimento, idRefeicao)}
                    removerDaLista={() => deleteLista(idRefeicao, alimento)}
                  />
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
                <button onClick={() => closeRefeicoesModal(true)}>
                  Fechar
                </button>
                <button
                  onClick={() =>
                    PostAlimentoRefeicao(listaSelecionados, idRefeicao)
                  }
                >
                  Salvar
                </button>
              </>
            ) : (
              <>
                <button onClick={getTodosAlimentos}>Adicionar alimentos</button>
                <button onClick={handleCopyRefeicao}>Copiar refeição</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}


export default (ModalAddFoodRefeicao) ;