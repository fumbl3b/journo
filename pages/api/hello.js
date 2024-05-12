export default function handler(req, res) {
    res.status(200).json({ hello: { 
        something: {
            array: [1,2,3,4,5]
        },
        text: "I'm text"
    } })
}