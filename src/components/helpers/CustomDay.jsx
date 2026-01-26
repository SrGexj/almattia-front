export const CustomDay = ({ courses, categories = [], date, day, handleDayClick, ...buttonProps }) => {
    
    const getEventsForDay = (date) =>
        courses.filter(e => {
            const [dayE, monthE, yearE] = e.start_date.split("/");
            const fecha = new Date(+yearE, +monthE - 1, +dayE);
            return fecha.toDateString() === date.toDateString();
        });

    const currentDate = date ?? (day && (day.date ?? day));
    if (!currentDate) {
        return <button {...buttonProps} className={`cursor-default rdp-day_button ${buttonProps.className || ''}`} />;
    }

    const eventsDelDia = getEventsForDay(currentDate);

    // normalize and dedupe category names for the day
    const categoriasDelDia = [
        ...new Set(
            eventsDelDia.flatMap(e => {
                const cats = e.categories ?? [];
                if (Array.isArray(cats)) {
                    return cats.map(c => (typeof c === 'string' ? c : c?.name)).filter(Boolean);
                }
                if (typeof cats === 'string') {
                    return cats.split(',').map(s => s.trim()).filter(Boolean);
                }
                if (typeof cats === 'object' && cats !== null) {
                    return [cats.name].filter(Boolean);
                }
                return [];
            })
        )
    ];

    return (
        <button
            {...buttonProps}
            className={`rdp-day_button ${buttonProps.className || ''}`}
            onClick={() => handleDayClick(currentDate)}
        >
            <span className={`rdp-day_date ${eventsDelDia.length > 0 ? 'border-1 rounded-full w-full h-full flex flex-col justify-center items-center leading-5' : ''}`}>
                {currentDate.getDate()}
                {categoriasDelDia.length > 0 && (
                    <div style={{ display: 'flex', gap: '2px', justifyContent: 'start', width: '100%', padding: '0 0 0 10px' }}>
                        {categoriasDelDia.map((cat, idx) => {
                            const categoria = categories.find(c => c.name === cat);
                            return (
                                <div
                                    key={idx}
                                    style={{
                                        width: '4px',
                                        height: '4px',
                                        borderRadius: '50%',
                                        backgroundColor: categoria?.color,
                                        display: categoria ? 'block' : 'none'
                                    }}
                                    className="mt-[2px]"
                                />
                            );
                        })}
                    </div>
                )}
            </span>
        </button>
    );
};