import React, { useState } from 'react';
import styles from './Agenda.module.scss';
import TituloSecao from '../../../components/tituloSection/TituloSecao';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Agenda() {
    const [checkboxStates, setCheckboxStates] = useState([false, false]);

    const handleCheckboxChange = (index) => {
        const newCheckboxStates = [...checkboxStates];
        newCheckboxStates[index] = !newCheckboxStates[index];
        setCheckboxStates(newCheckboxStates);
    };

    return (
        <div>
            <div className={styles['agenda-container']}>
                <TituloSecao title="Agenda" />
                <div className={styles["calendario-container"]}>
                    <div className={styles['calendario']}>
                        <Fullcalendar
                            locale={'pt-br'}
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            initialView={"dayGridMonth"}
                            headerToolbar={{
                                start: "today prev,next",
                                center: "title",
                                end: "dayGridMonth,timeGridWeek,timeGridDay",
                            }}
                            height={"50vh"}
                            events={[
                                {
                                    id: 'a',
                                    title: 'Maria',
                                    start: '2023-10-26T08:30:00',
                                    end: '2023-10-26T09:00:00',
                                    backgroundColor: '#B6B6F6',
                                    demanding: true
                                },
                                {
                                    id: 'c',
                                    title: 'Claudia',
                                    start: '2023-10-26T17:30:00',
                                    end: '2023-10-26T18:00:00',
                                    backgroundColor: '#B6B6F6',
                                    demanding: true
                                },
                            ]}
                        />
                    </div>
                    <div className={styles['compromissos']}>         
                    <div className={styles['compromisso']}>
                    <div className={styles['dia']}>
                        27
                        </div>
                        <div className={styles['consulta']}>
                          <div className={styles['hora-paciente']}>
                            <p className={styles['hora']}>08h30 - </p>
                            <p className={styles['paciente']}>Maria</p>
                          </div>
                            <input
                                className={styles['checkbox']}
                                type="checkbox"
                                checked={checkboxStates[0]}
                                onChange={() => handleCheckboxChange(0)}
                            />
                        </div>
                    </div>
                    <div className={styles['compromisso']}>
                    <div className={styles['dia']}>
                        </div>
                        <div className={styles['consulta']}>
                          <div className={styles['hora-paciente']}>
                            <p className={styles['hora']}>08h30 - </p>
                            <p className={styles['paciente']}>Maria</p>
                          </div>
                            <input
                                className={styles['checkbox']}
                                type="checkbox"
                                checked={checkboxStates[0]}
                                onChange={() => handleCheckboxChange(0)}
                            />
                        </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    );
}
