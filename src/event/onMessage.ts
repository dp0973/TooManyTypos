import { Message, Client } from 'discord.js'
import axios from 'axios'
import config from '../config'

export default function onMessage (client: Client, msg: Message) {
    const { author, content } = msg

    if (author.id != config.author) return
    const errata = () => {
        return axios.get(
            `https://openapi.naver.com/v1/search/errata.json?query=${encodeURI(content)}`, {
                headers: {
                    'X-Naver-Client-Id': config.naverClientId,
                    'X-Naver-Client-Secret': config.naverClientSecret
                }
            }
        ).then(function (response) {
            const new_text = response.data.errata
            if (new_text == '') return
            msg.delete()
            msg.channel.send(new_text)
        })
    }

    errata()
}
