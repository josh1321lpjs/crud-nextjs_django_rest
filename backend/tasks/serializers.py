from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'title', 'desciption', 'done', 'created_at')
        #datos que no se pueden modificar
        read_only_fields = ('id', 'created_at')
    