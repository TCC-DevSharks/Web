import React, { useState, useEffect } from 'react';
import styles from './Agenda.module.scss';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from 'axios';
import { format } from 'date-fns';
import Sidebar from '../../../components/sideBar/Sidebar';


export default function Agenda() {

    function convertToDate(value) {
        if (value instanceof Date) {
            return value;
        } else {
            return new Date(value);
        }
    }

    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);


    useEffect(() => {
        const IdMedico = localStorage.getItem("id");
        axios.get(`https://api-bebevindo.azurewebsites.net/profissional/gestante/${IdMedico}`)
            .then(response => {
                const eventos = response.data.pacientes.map(paciente => {
                    const [ano, mes, dia] = paciente.diaDesformatado.split("-")
                    const [diaFormatado, resto] = dia.split('T')
                    const [hora, min] = paciente.hora.split(":")

                    const dataFormatada = `${ano}-${mes}-${diaFormatado} ${hora}:${min}`
                    const diaDesformatado = paciente.diaDesformatado;

                    return {
                        id: paciente.idConsulta,
                        title: paciente.nome,
                        start: dataFormatada,
                        end: dataFormatada,
                    };
                });


                setEvents(eventos);


            })
            .catch(error => {
                console.error('Erro ao obter os eventos: ', error);
            });
    }, []);
    return (
        <div>


            <div className={styles['agenda-container']}>

                <Sidebar />

                <div className={styles["calendario-container"]}>
                    <h1>Agenda</h1>
                    <div className={styles["container-calendario"]}>
                        <div className={styles["calendario"]}>
                            <Fullcalendar
                                locale={'pt-br'}
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                initialView={"dayGridMonth"}
                                headerToolbar={{
                                    start: "today prev,next",
                                    center: "title",
                                    end: "dayGridMonth,timeGridWeek,timeGridDay",
                                }}
                                height={"70vh"}
                                timeZone="America/Sao_Paulo"
                                events={events}
                            />
                        </div>
                        <div className={styles['compromissos']}>
                            <h2>
                                Compromissos do dia:
                            </h2>
                            {events
                                .filter(evento => {
                                    const eventoDate = convertToDate(evento.start);
                                    return (
                                        eventoDate.getDate() === currentDate.getDate() &&
                                        eventoDate.getMonth() === currentDate.getMonth() &&
                                        eventoDate.getFullYear() === currentDate.getFullYear()
                                    );
                                })
                                .map(evento => (
                                    <div className={styles['compromisso']} key={evento.id}>
                                        <div className={styles['dia']}>
                                            <p >{convertToDate(evento.start).getDate()}</p>
                                        </div>
                                        <div className={styles['consulta']}>
                                            <div className={styles['hora-paciente']}>
                                                <p className={styles['hora']}>
                                                    {format(convertToDate(evento.start), 'HH:mm', { timeZone: 'America/Sao_Paulo' })} -
                                                </p>
                                                <p className={styles['paciente']}>{evento.title}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

