import Clock from './deps/clock.js';
import View from './view.js'
const clock = new Clock()
const view = new View()

const worker = new Worker('./src/worker/worker.js', {
    type: 'module'
})

worker.onmessage = ({data}) => {
    if(data.status !== 'done') return;
    
    clock.stop()
    view.updateElapsedTime(`Process took ${took.replace('ago', '')}`)
}

worker.postMessage('enviado do paii!')

let took = ''
view.configureOnFileChange(file => {
    worker.postMessage({
        file
    })

    clock.start((time) => {
        took = time;
        view.updateElapsedTime(`Process started ${time}`)
    })
})

async function fakeFetch()
{
    const filePath = '/videos/pegaramMeuTelefone.mp4'
    const response = await fetch(filePath)

    // traz o tamanho do arquivo
    // const response = await fetch(filePath, {
    //     method: "HEAD"
    // })
    // response.headers.get('content-length')
    // debugger

    const file = new File([await response.blob()], filePath, {
        type: 'video/mp4',
        lastModified: Date.now()
    })

    const event = new Event('change')
    Reflect.defineProperty(
        event,
        'target',
        { value: {files: [file]} }
    )

    document.getElementById('fileUpload').dispatchEvent(event)
}

fakeFetch()