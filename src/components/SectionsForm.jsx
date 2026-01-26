import { useRef, useState } from 'react'
import PhoneInput from 'react-country-phone-input'
import 'react-country-phone-input/lib/style.css'
import toast from 'react-hot-toast';

export const SectionsForm = ({ typeTitle, typeFields, directedFields, backgroundColor, inputColor, borderColor, endpoint}) => {

    const formRef = useRef(null)

    const VITE_BPANEL_API = import.meta.env.VITE_BPANEL_API
    const VITE_BPANEL_TOKEN = import.meta.env.VITE_BPANEL_TOKEN

    const typeName = typeTitle === 'formación' ? 'training_type' : typeTitle === 'evento' ? 'event_type' : '';

    const [phone, setPhone] = useState('')

    const checkFields = (form) => {
        let hasError = false;

        // Validar campos obligatorios
        if (!form.name.trim()) {
            toast.error('El campo Nombre es obligatorio.');
            hasError = true;
        }
        if (!form.surname.trim()) {
            toast.error('El campo Apellidos es obligatorio.');
            hasError = true;
        }
        if (!form.email.trim()) {
            toast.error('El campo Correo Electrónico es obligatorio.');
            hasError = true;
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            toast.error('El formato del Correo Electrónico no es válido.');
            hasError = true;
        }
        if (!phone.trim()) {
            toast.error('El campo Teléfono es obligatorio.');
            hasError = true;
        }
        if (typeFields && typeFields.length > 0 && !form[typeName].trim()) {
            toast.error(`El campo Tipo de ${typeName} es obligatorio.`);
            hasError = true;
        }
        if (directedFields && directedFields.length > 0 && !form.directed_to.trim()) {
            toast.error('El campo Dirigido a es obligatorio.');
            hasError = true;
        }
        if (!form.request_type.trim()) {
            toast.error('El campo ¿Qué necesitas de nosotras? es obligatorio.');
            hasError = true;
        }

        if (!form.contact_details.trim()) {
            toast.error('Debes seleccionar al menos un método de contacto.');
            hasError = true;
        }

        return !hasError;
    }

    const submitForm = async (e) => {
        e.preventDefault()

        const type = typeFields ? formRef.current.elements.type : null
        const directed = directedFields ? formRef.current.elements.directed : null

        const { name, surname, mail, contactMail, contactPhone, contactVideo, reqType } = formRef.current.elements

        const contact_details = [
            contactMail.checked ? 'Correo Electrónico' : null,
            contactPhone.checked ? ' Teléfono' : null,
            contactVideo.checked ? ' Videollamada' : null
        ].filter(Boolean).join(',');

        const formData = {
            name: name.value,
            surname: surname.value,
            email: mail.value,
            [typeName]: typeFields ? type.value : '',
            directed_to: directedFields ? directed.value : '',
            request_type: reqType.value,
            phone: phone,
            contact_details
        }

        if (checkFields(formData)) {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${VITE_BPANEL_TOKEN}`
                },
                body: JSON.stringify(formData)
            }

            console.log(formData)

            try {
                const response = await fetch(`${VITE_BPANEL_API}/${endpoint}`, options)

                if (response.ok) {
                    toast.success('Formulario enviado con éxito.')
                    formRef.current.reset()
                    setPhone('')
                } else {
                    toast.error('Error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.')
                }
            } catch (error) {
                console.error('Error submitting form:', error)
                toast.error('Error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.')
            }
        } else {
            toast.error('Por favor, corrige los errores en el formulario e inténtalo de nuevo.')
            return
        }
 
    }

    return (
        <>
            <form ref={formRef} action="" className="max-[1025px]:w-[95%] h-full relative w-fit text-left p-6 rounded-[20px] border-2 flex flex-col gap-6 backdrop-blur-[4px] z-4 mr-10 max-[1025px]:-mr-0 max-[1025px]:-mb-30 max-[1025px]:ml-5 max-[768px]:ml-2 max-[1025px]:-mt-5  " style={{backgroundColor: backgroundColor, borderColor: borderColor}}>
                <div className="flex gap-4 max-[768px]:flex-col">
                    <div className="flex flex-col">
                        <label className="pl-3 text-[20px] font-regular text-white" htmlFor="name">
                            Nombre <span className="text-[16px] text-red-500">*</span>
                        </label>
                        <input className="pl-3 mt-1 p-2 text-white/80 font-light rounded-[20px]" id="name" name="name" type="text" placeholder="Escriba su nombre" style={{backgroundColor: inputColor}} />
                    </div>
                    <div className="flex flex-col">
                        <label className="pl-3 text-[20px] font-regular text-white" htmlFor="surname">
                            Apellidos <span className="text-[16px] text-red-500">*</span>
                        </label>
                        <input className="pl-3 mt-1 p-2 text-white/80 font-light rounded-[20px]" id="surname" name="surname" type="text" placeholder="Escriba sus apellidos" style={{backgroundColor: inputColor}} />
                    </div>
                </div>
                <div className="flex flex-col">
                    <label className="pl-3 text-[20px] font-regular text-white" htmlFor="mail">
                        Correo Electrónico <span className="text-[16px] text-red-500">*</span>
                    </label>
                    <input className="pl-3 mt-1 p-2 text-white/80 font-light rounded-[20px]" id="mail" name="mail" type="email" placeholder="Escriba su correo electrónico" style={{backgroundColor: inputColor}} />
                </div>
                <div className="flex flex-col relative">
                    <label className="pl-3 text-[20px] font-regular text-white" htmlFor="phone">
                        Teléfono <span className="text-[16px] text-red-500">*</span>
                    </label>
                    <PhoneInput
                        className="mt-1 text-white/80 font-light rounded-[40px] w-full"
                        inputStyle={{backgroundColor: inputColor,border: 'none', fontSize: '16px', fontFamily:'dm sans', borderRadius: '40px', width: '100%'}}
                        dropdownStyle={{backgroundColor: inputColor, border: 'none', fontSize: '16px', fontFamily:'dm sans', borderRadius: '40px'}}
                        buttonStyle={{backgroundColor: inputColor, border: 'none'}}
                        value={phone}
                        onChange={setPhone}
                        placeholder="Escriba su teléfono"
                        country={'es'}
                    />
                </div>
                { typeFields && typeFields.length > 0 &&
                    <div className="flex flex-col">
                        <label className="pl-3 text-[20px] font-regular text-white" htmlFor="type">
                            ¿Qué tipo de {typeTitle} tienes en mente?<span className="text-[16px] text-red-500">*</span>
                        </label>
                        <select className="pl-3 mt-1 p-2 text-white/80 font-light rounded-[20px]" id="type" name="type" defaultValue="" style={{backgroundColor: inputColor}}>
                            <option value="" disabled>Seleccione una opción</option>
                            {
                                typeFields && typeFields.length > 0 && typeFields.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))
                            }
                        </select>
                    </div>
                }
                { directedFields && directedFields.length > 0 &&
                    <div className="flex flex-col">
                        <label className="pl-3 text-[20px] font-regular text-white" htmlFor="directed">
                            ¿A quién va dirigida? <span className="text-[16px] text-red-500">*</span>
                        </label>
                        <select className="pl-3 mt-1 p-2 text-white/80 font-light rounded-[20px]" id="directed" name="directed" defaultValue="" style={{backgroundColor: inputColor}}>
                            <option value="" disabled>Seleccione una opción</option>
                            {
                                directedFields && directedFields.length > 0 && directedFields.map((directed, index) => (
                                    <option key={index} value={directed}>{directed}</option>
                                ))
                            }
                        </select>
                    </div>
                }
                <div className="flex flex-col">
                        <label className="pl-3 text-[20px] font-regular text-white" htmlFor="type">
                            ¿Qué necesitas de nosotras?<span className="text-[16px] text-red-500">*</span>
                        </label>
                        <select className="pl-3 mt-1 p-2 text-white/80 font-light rounded-[20px]" id="reqType" name="reqType" defaultValue="" style={{backgroundColor: inputColor}}>
                            <option value="" disabled>Seleccione una opción</option>
                            {
                                ['Organización integral del evento', 'Coordinación del evento', 'Producción técnica', 'Diseño y decoración', 'Catering y restauración', 'Otros servicios'].map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))
                            }
                        </select>
                    </div>

                <div className="pl-3 flex flex-col gap-3 text-left">
                    <label className="text-[20px] font-regular text-white">
                        ¿Cómo prefieres que te contactemos? <span className="text-[16px] text-red-500">*</span>
                    </label>
                    <div className="pr-3 flex gap-2 items-center justify-between">
                        <div className="flex gap-[.5px] items-center cursor-pointer">
                            <input type='checkbox' id='contactMail' name='contactMail'  className='accent-[#5a5e53] border-1 hover:accent-[#b2bba2] mr-2 transition-all'/>
                            <label htmlFor='contactMail' className='cursor-pointer text-white font-light'>Email</label>
                        </div>
                        <div className="flex gap-[.5px] items-center cursor-pointer">
                            <input type='checkbox' id='contactPhone' name='contactPhone' className='accent-[#5a5e53] border-1 hover:accent-[#b2bba2] mr-2 transition-all'/>
                            <label htmlFor='contactPhone' className='cursor-pointer text-white font-light'>Teléfono</label>
                        </div>
                        <div className="flex gap-[.5px] items-center cursor-pointer">
                            <input type='checkbox' id='contactVideo' name='contactVideo' className='accent-[#5a5e53] border-1 hover:accent-[#b2bba2] mr-2 transition-all'/>
                            <label htmlFor='contactVideo' className='cursor-pointer text-white font-light'>Videollamada</label>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={submitForm}
                    className="cursor-pointer mt-2 px-4 py-2.5 rounded-full text-[#363735] bg-white font-medium text-[16px] hover:bg-[#5a5e53] hover:text-white transition-all duration-300 self-start"
                >
                    Enviar formulario
                </button>
            </form>
        </>
    )
}