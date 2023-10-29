//Processo em segundo plano

onmessage = ({data}) => {
    debugger
    setTimeout(() => {
        self.postMessage({
            status: 'done'
        })
    }, 2000)
}