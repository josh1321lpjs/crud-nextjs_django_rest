### Comandos de entorno virtual en python
    -***python3 -m venv venv***

### Instalar paquete para conexion con posgresql
    -***pip install psycopg2-binary***

### Comandos de Django REST Framework

1. Inicializar proyecto de Django
    - ***django-admin startproject taskapi .***
2. Añadir aplicación 
    - ***python manage.py startapp tasks***
3. Añadir ***tasks*** y ***rest_framework*** al archivo de configuración ***settings.py***
4. Añadimos un modelo en la aplicación ***tasks***
```
class Task(models.Model):
    title = models.CharField(max_length=200)
    desciption = models.TextField(null=True, blank=True)
    done = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
```
5. Creación de la migración del modelo desde la terminal con el comando
    - ***python manage.py makemigrations***
6. Ejecutamos la migración con el comando 
    - ***python manage.py migrate***
7. Creación del archivo ***serializers.py*** dentro de la aplicación ***tasks***
```
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        field = ('id', 'title', 'desciption', 'done', 'created_at')
        #datos que no se pueden modificar
        read_only_fields = ('id', 'created_at')
```
8. Creamos un archivo ***api.py*** en donde se crean los ***viewsets**
```
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    permissin_classes = [permissins.AllowAny]
    serializer_class = TaskSerializer
```
9. agregamos la ruta en la carpeta ***taskapi*** en el archivo ***url.py***
```
    path('', include('tasks.urls')),
```
10. Ejecutamos el servidor
    - ***python manage.py runserver***

13. Es necesario instalar cors para la comunicación el localhost del backend y frontend
    -***python -m pip install django-cors-headers***
### Comandos de Next js
11. En la carpeta raíz ejecutamos el siguiente comando para creaar un proyecto de next 
    - ***npx create-next-app frontend***
12. Para ejecutar el proyecto de frontend acceder a la carpeta del proyecto y escribir el siguiente comando
    - ***npm run dev***

14. Para el uso de Nexy js tomar en cuenta que se tienen dos opciones el modo cliente que son datos que se renderizan del lado del frontend y el modo servidor en el cual los datos son procesados desde el lado del backend, para identificar el modo cliente se declara con la siguiente linea de comando ```"use client"```

15. Otra configuración importante es usar la siguiente linea de codigo ```export const dynamic = "force-dynamic"``` en la pagina principal llamada ***page.js*** para que se puedan ver la actualizacion de los datos del servidor en el cliente