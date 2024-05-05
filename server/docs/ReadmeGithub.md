<!-- comandos basicos de github -->
## inicializar git en nuestro proyecto
    git init 
## Añadimos todos los archivos para el commit
    git add .
## hacer commits
    git commit -m "tu commit"
## Subir al repositorio
    git push -u origin "rama"
## Para moverte de rama
    git switch "nombre de rama"
## Para crear rama
    git switch -C "nombre de rama"
## Mostrar historial de commits
    git log
## Listar un estado actual del repositorio con lista de archivos modificados o agregados
	git status
## renombrar rama actual
    git branch -M "nuevoNombre"