
/**
 * Renders a layered background effect
 * @returns React.Component
 */
export default function Background() {

    return (
        <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: "100%",
            zIndex: -1,
            transform: "scaleY(2.66)",
            transformOrigin: "bottom",
            opacity: 0.75
        }}>
            <svg 
                style={{
                    filter: "blur(40px)"
                }}
                id="visual" 
                viewBox="0 0 900 600" 
                width="900" 
                height="600" 
                xmlns="http://www.w3.org/2000/svg" 
                xmlnsXlink="http://www.w3.org/1999/xlink" 
                version="1.1"
            >
                    <path 
                        d="M0 363L82 387L164 334L245 388L327 340L409 352L491 349L573 353L655 371L736 384L818 382L900 381L900 601L818 601L736 601L655 601L573 601L491 601L409 601L327 601L245 601L164 601L82 601L0 601Z" 
                        fill="#f268ff">
                    </path>
                    <path 
                        d="M0 401L82 370L164 377L245 419L327 414L409 385L491 395L573 391L655 396L736 415L818 372L900 414L900 601L818 601L736 601L655 601L573 601L491 601L409 601L327 601L245 601L164 601L82 601L0 601Z" 
                        fill="#ca56d4">
                    </path>
                    <path 
                        d="M0 447L82 445L164 452L245 423L327 409L409 454L491 452L573 407L655 445L736 425L818 414L900 409L900 601L818 601L736 601L655 601L573 601L491 601L409 601L327 601L245 601L164 601L82 601L0 601Z" 
                        fill="#a344ab">
                    </path>
                    <path 
                        d="M0 457L82 469L164 488L245 479L327 474L409 466L491 480L573 490L655 459L736 464L818 471L900 468L900 601L818 601L736 601L655 601L573 601L491 601L409 601L327 601L245 601L164 601L82 601L0 601Z" 
                        fill="#7e3484">
                    </path>
                    <path 
                        d="M0 495L82 502L164 492L245 519L327 503L409 501L491 524L573 508L655 528L736 509L818 496L900 523L900 601L818 601L736 601L655 601L573 601L491 601L409 601L327 601L245 601L164 601L82 601L0 601Z" 
                        fill="#5a245f">
                    </path>
                    <path 
                        d="M0 547L82 553L164 545L245 557L327 551L409 558L491 533L573 533L655 543L736 562L818 557L900 558L900 601L818 601L736 601L655 601L573 601L491 601L409 601L327 601L245 601L164 601L82 601L0 601Z" 
                        fill="#39153c">
                    </path>
            </svg>
        </div>
    )
}