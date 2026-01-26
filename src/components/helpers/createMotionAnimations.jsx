export const createMotionAnimations = (baseDelay = 0.1) => {
    let index = 0

    return {
        next: () => {
            const delay = index * baseDelay
            index++
            return {
                initial: { opacity: 0, x: -50 },
                whileInView: { opacity: 1, x: 0 },
                transition: { duration: 0.6, delay },
                viewport: { margin: "0px 0px -250px 0px", once: true }
            }
        },
        reset: () => { index = 0 }
    }
}