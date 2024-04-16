/** @jsxImportSource @emotion/react */
import * as s from "./style";

function AuthPageInput({ type, name, placeholder, value, onChange, onBlur, ref, message }) {
    return (
        <div css={s.inputBox}>
            <input 
                css={s.input}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
            />
            { 
                !!message && 
                <div css={s.inputIcon(message.type)}>
                    {message.type === "error" ? <button/> : <button/>}
                </div>
            }
            { 
                !!message && 
                <div css={s.messageBox(message.type)}>
                    { message.text }
                </div>
            }
            
        </div>
    );
}

export default AuthPageInput;