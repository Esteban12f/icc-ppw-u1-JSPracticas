'use strict'

// Variables

const nombre = "Esteban"
const apellido = "Hernandez"
let edad = 22
const carrera = "Ingenieria en Computacion"
let semestre = 5
const activo = true

const materias = [
    "Programacion",
    "Base de Datos",
    "Redes",
    "Estadistica"
]

const direccion = {
    ciudad: "Cuenca",
    provincia: "Azuay"
}

console.log(nombre, apellido, edad, carrera, semestre, activo)
console.table(materias)
console.table(direccion)


// Funciones

const calcularPromedio = (notas) => {
    const suma = notas.reduce((acum, nota) => acum + nota, 0)
    return suma / notas.length
}

const esMayorDeEdad = (edad) => edad >= 18

const formatearNombre = (nombre, apellido) => {
    return `${apellido.toUpperCase()}, ${nombre}`
}

const generarSaludo = (nombre, hora) => {

    if (hora < 12) return `Buenos dias ${nombre}`
    if (hora < 18) return `Buenas tardes ${nombre}`

    return `Buenas noches ${nombre}`
}


// Arrays

const estudiantes = [
  { nombre: 'Ana', nota: 85, activo: true },
  { nombre: 'Luis', nota: 42, activo: true },
  { nombre: 'Maria', nota: 93, activo: false },
  { nombre: 'Carlos', nota: 67, activo: true },
  { nombre: 'Sofia', nota: 78, activo: true }
]

const aprobados = estudiantes.filter(e => e.nota >= 70)

const nombres = estudiantes.map(e => e.nombre)

const promedioGeneral =
    estudiantes.reduce((acc, e) => acc + e.nota, 0) / estudiantes.length

const mejorEstudiante =
    estudiantes.reduce((max, e) => e.nota > max.nota ? e : max)

const todosActivos = estudiantes.every(e => e.activo)

const algunoMayor90 = estudiantes.some(e => e.nota > 90)


// DOM

const infoEstudiante = document.getElementById("infoEstudiante")
const funciones = document.getElementById("funciones")
const arrays = document.getElementById("arrays")

infoEstudiante.innerHTML = `
<p>Nombre: ${nombre} ${apellido}</p>
<p>Edad: ${edad}</p>
<p>Carrera: ${carrera}</p>
<p>Semestre: ${semestre}</p>
<p>Activo: ${activo}</p>
<p>Ciudad: ${direccion.ciudad}</p>
<p>Provincia: ${direccion.provincia}</p>
<p>Materias: ${materias.join(", ")}</p>
`

const promedioEjemplo = calcularPromedio([80,90,70,100])

funciones.innerHTML = `
<p>Promedio de ejemplo: ${promedioEjemplo}</p>
<p>Mayor de edad: ${esMayorDeEdad(edad)}</p>
<p>Nombre formateado: ${formatearNombre(nombre,apellido)}</p>
<p>Saludo: ${generarSaludo(nombre,14)}</p>
`

arrays.innerHTML = `
<p>Aprobados: ${aprobados.map(e => e.nombre).join(", ")}</p>
<p>Nombres: ${nombres.join(", ")}</p>
<p>Promedio general: ${promedioGeneral.toFixed(2)}</p>
<p>Mejor estudiante: ${mejorEstudiante.nombre} (${mejorEstudiante.nota})</p>
<p>Todos activos: ${todosActivos}</p>
<p>Alguno mayor a 90: ${algunoMayor90}</p>
`