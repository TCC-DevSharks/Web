import styles from "./Perfil.module.scss";
import Sidebar from "../../../components/sideBar/Sidebar";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Perfil() {
  const [listMedicos, setMedicos] = useState();
  console.log(listMedicos);
  const [listEnderecoMedico, setEnderecoMedico] = useState();
  const IdMedico = typeof window !== "undefined" ? localStorage.getItem("id") : null;
  const [cep, setCep] = useState();
  const [editMode, setEditMode] = useState(false);

  const [editTelefone, setEditedTelefone] = useState(
    listMedicos?.profissionais && listMedicos.profissionais[0]
      ? listMedicos.profissionais[0].telefone
      : ""
  );

  const [editEmail, setEditEmail] = useState(
    listMedicos?.profissionais && listMedicos?.profissionais[0]
      ? listMedicos.profissionais[0].email : "");

  const [editRazaoSocial, setEditRazaoSocial] = useState(
    listMedicos?.profissionais && listMedicos.profissionais[0]
      ? listMedicos.profissionais[0].nome
      : ""
  );
  // const [editDescricao, setEditDescricao] = useState(

  //     listMedicos?.profissionais && listMedicos.profissionais[0]
  //       ? listMedicos.profissionais[0].descricao
  //       : ""
  // );
  const [editCep, setEditCep] = useState(
    listMedicos?.profissionais && listMedicos.profissionais[0]
      ? listMedicos.profissionais[0].cep
      : "");

  const [editNumero, setEditNumero] = useState(
    listMedicos?.profissionais && listMedicos.profissionais[0]
      ? listMedicos.profissionais[0].numero
      : "");

  function PutPerfilMedico() {
    if (!listMedicos || !listMedicos.profissionais || listMedicos.profissionais.length === 0) {
      console.error("Error: No data available for profissionais.");
      return;
    }

    const url = `https://api-bebevindo.azurewebsites.net/profissional/${IdMedico}`;
    const jsonData = {
      nome: listMedicos.profissionais[0].nome || "",
      crm: listMedicos.profissionais[0].crm || "",
      email: listMedicos.profissionais[0].email || "",
      foto: listMedicos.profissionais[0].foto || "",
      id_telefone: listMedicos.profissionais[0].idTelefone || "",
      telefone: editTelefone ? editTelefone : listMedicos.profissionais[0].telefone || "",
      tipo_telefone: 2,
      id_endereco: listMedicos.profissionais[0].idEndereco || "",
      numero: editNumero ? editNumero : listMedicos.profissionais[0].numero || "",
      complemento: listMedicos.profissionais[0].complemento || "",
      cep: editCep ? editCep : listMedicos.profissionais[0].cep || "",
    };

    console.log(jsonData);

    axios
      .patch(url, jsonData)
      .then((response) => {
        const data = response.data;
        console.log("aqui " + data);
        if (response.status === 200) {
          const notify = () =>
            toast.success(data.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          notify();
        } else {
          console.log("aqu " + data);
          toast.error(data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          notify();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    function getMedico() {
      const url = `https://api-bebevindo.azurewebsites.net/profissional/${IdMedico}`;
      axios
        .get(url)
        .then((response) => {
          const data = response.data;
          setMedicos(data);
          const cepFromResponse = data.profissional[0].cep;
          setCep(cepFromResponse);


        })
        .catch((error) => {
          console.error(error);
        });
    }

    getMedico();
  }, [IdMedico]);

  useEffect(() => {
    if (cep) {
      function enderecoMedico(cep) {
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        axios
          .get(url)
          .then((response) => {
            const data = response.data;
            setEnderecoMedico(data);
          })
          .catch((error) => console.log(error));
      }

      enderecoMedico(cep);
    }
  }, [cep]);

  if (!listMedicos) {
    return <p>Loading...</p>;
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
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="black"
      />

      <section className={styles.container_geral}>
        <Sidebar />
        <div className={styles.container}>
          <div className={styles.container_cima}>
            <h1 className={styles.container_title}>Vizualização do perfil</h1>
          </div>

          <div className={styles.container_perfil}>
            <div className={styles.container_dados}>
              {listMedicos?.profissionais.map((profissional) => (
                <>
                  <div className={styles.dados_iniciais}>
                    <div className={styles.dados_foto}>
                      <div className={styles.img_img}>
                        <img
                          src={profissional.foto}
                        />
                      </div>

                      <div className={styles.inputs}>
                        {editMode ? (
                          <>
                            <label htmlFor="">
                              Nome:
                              <input
                                placeholder={editRazaoSocial}
                                value={editRazaoSocial}
                                onChange={(e) => setEditRazaoSocial(e.target.value)}
                              />
                            </label>

                            <label htmlFor="">
                              Telefone:
                              <input
                                placeholder={editTelefone}
                                value={editTelefone}
                                onChange={(e) =>
                                  setEditedTelefone(e.target.value)
                                }
                              />
                            </label>

                            <label htmlFor="">
                              E-mail:
                              <input
                                placeholder={editEmail}
                                onChange={(e) => setEditEmail(e.target.value)}
                              />
                            </label>
                          </>
                        ) : (

                          <>
                            <label htmlFor="">
                              Nome:
                              <input
                                style={{ color: "#aaa3aa" }}
                                value={profissional.nome}
                              />
                            </label>

                            <label htmlFor="">
                              {" "}
                              Telefone:
                              <input
                                style={{ color: "#aaa3aa" }}
                                value={profissional.telefone}
                              />
                            </label>

                            <label htmlFor="">
                              E-mail:
                              <input
                                style={{ color: "#aaa3aa" }}
                                value={profissional.email}
                              />
                            </label>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={styles.dados_finais}>
                    <div className={styles.inputs_row1}>
                      {/* {editMode ? (
                        <textarea
                          placeholder={editDescricao}
                          onChange={(e) => setEditDescricao(e.target.value)}
                          className="input_descricao"
                        />
                      ) : (
                        <textarea
                          style={{ color: "#aaa3aa" }}
                          value={profissional.descricao}
                          className="input_descricao"
                        />
                      )} */}
                    </div>

                    <div className={styles.inputs_row2}>
                      {editMode ? (
                        <>
                          <label htmlFor="">
                            Cep:{" "}
                            <input
                              placeholder={profissional.cep}
                              onChange={(e) => setEditCep(e.target.value)}
                              className={styles.input_cep}
                            />
                          </label>

                          <label htmlFor="">
                            Logradouro:{" "}
                            <input
                              value={listEnderecoMedico?.logradouro}
                              placeholder={listEnderecoMedico?.logradouro}
                              className={styles.input_rua}
                            />
                          </label>

                          <label htmlFor="">
                            Número
                            <input
                              type="text"
                              placeholder={editNumero}
                              onChange={(e) => setEditNumero(e.target.value)}
                              className={styles.input_n}
                            />
                          </label>

                          <label htmlFor="">
                            Bairro:
                            <input
                              value={listEnderecoMedico?.bairro}
                              placeholder={listEnderecoMedico?.bairro}
                              className={styles.input_bairro}
                            />
                          </label>

                          <label htmlFor="">
                            Cidade:
                            <input
                              value={listEnderecoMedico?.localidade}
                              placeholder={listEnderecoMedico?.localidade}
                              className={styles.input_cidade}
                            />
                          </label>
                        </>
                      ) : (
                        <>
                          <label htmlFor="">
                            {" "}
                            Cep:
                            <input
                              style={{ color: "#aaa3aa" }}
                              placeholder={profissional.cep}
                              value={profissional.cep}
                              className={styles.input_cep}
                            />
                          </label>

                          <label htmlFor="">
                            {" "}
                            Logradouro:
                            <input
                              style={{ color: "#aaa3aa" }}
                              value={listEnderecoMedico?.logradouro}
                              className={styles.input_rua}
                            />
                          </label>

                          <label htmlFor="">
                            Número:
                            <input
                              style={{ color: "#aaa3aa" }}
                              value={profissional.numero}
                              className={styles.input_n}
                            />
                          </label>

                          <label htmlFor="">
                            {" "}
                            Bairro:
                            <input
                              style={{ color: "#aaa3aa" }}
                              value={listEnderecoMedico?.bairro}
                              className={styles.input_bairro}
                            />
                          </label>

                          <label htmlFor="">
                            Cidade:
                            <input
                              style={{ color: "#aaa3aa" }}
                              value={listEnderecoMedico?.localidade}
                              className={styles.input_cidade}
                            />
                          </label>
                        </>
                      )}
                    </div>
                    
                    <div style={{ display: "flex", gap: "30px" }}>
                      {editMode ? (
                        <button
                          onClick={PutPerfilMedico}
                          className={styles.btn}
                        >
                          Salvar
                        </button>
                      ) : (
                        <button
                          className={styles.btn}
                          onClick={() => setEditMode(true)}
                        >
                          Editar
                        </button>
                      )}
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


