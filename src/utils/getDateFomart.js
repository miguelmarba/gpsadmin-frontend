export default function(fecha) {
    const date = new Date(fecha);

    const d = date.getDate();
    const m = date.getMonth()+1;
    return d + '-' + m;
}