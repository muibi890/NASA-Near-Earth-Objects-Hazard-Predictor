from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse
import joblib
import os
from tensorflow.keras.models import load_model
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

class ModelApi(APIView):
    def findStandardisedValues(self,relative_velocity,miss_distance,absolute_magnitude,est_diameter_max):
        l1={}
        # relative_velocity
        min_X = 203.34643253
        max_X = 236990.1280878666
        relative_velocity = (relative_velocity - min_X) / (max_X - min_X)
        l1["relative_velocity"]=relative_velocity

        #miss_distance	
        min_X = 6745.532515957
        max_X = 74798651.4521972
        miss_distance = (miss_distance - min_X) / (max_X - min_X)

        l1["miss_distance"]=miss_distance

        #absolute_magnitude	
        min_X = 9.23
        max_X = 33.2
        absolute_magnitude = (absolute_magnitude - min_X) / (max_X - min_X)
        l1["absolute_magnitude"]=absolute_magnitude

        #	est_diameter_max	
        min_X = 0.00136157
        max_X = 84.7305408852
        est_diameter_max = (est_diameter_max - min_X) / (max_X - min_X)
        l1["est_diameter_max"]=est_diameter_max
        return l1
        
    
    def post(self,request):
        print(request.data)
        
        relative_velocity=request.data['relative_velocity']
        miss_distance=request.data['miss_distance']
        absolute_magnitude=request.data['absolute_magnitude']
        est_diameter_max=request.data['est_diameter_max']
        l1=self.findStandardisedValues(relative_velocity,miss_distance,absolute_magnitude,est_diameter_max)
        data=[[l1['relative_velocity'],l1['miss_distance'],l1['absolute_magnitude'],l1['est_diameter_max']]]
        
        model=load_model(".\Model\model.h5")
        prediction=model.predict(data)
        prediction_binary=-1
        if prediction<0.15:
            prediction_binary=0
        elif prediction>=0.15:
            prediction_binary=1
        
        if prediction_binary==0:
            return Response({"Prediction":"Non Hazardous"} ,status=status.HTTP_200_OK)
        elif prediction_binary==1:
             return Response({"Prediction":"Hazardous"} ,status=status.HTTP_200_OK)
        return Response({"Error":"Server Error"} ,status=status.HTTP_500_INTERNAL_SERVER_ERROR)
