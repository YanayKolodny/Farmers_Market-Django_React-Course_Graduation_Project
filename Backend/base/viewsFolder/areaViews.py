
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from ..models import Area
from ..serializersFolder.areaSerializers import AreaSerializer

# Add area START
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addNewArea(request):  

    print("request.data",request.data)
    serializer = AreaSerializer(data=request.data)
    if (serializer.is_valid()):
        serializer.save()
        return Response(serializer.data)

    else: return Response("Error, invalid data...")

# EXAMPLE of request addNewStand should receive 
# {
#   "areaName":"east"
# }
# Add area END

# GET ALL Areas START
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllAreas(request):
    areas = Area.objects.all()
    serializer = AreaSerializer(areas, many=True)
    return Response(serializer.data)
# GET ALL Areas END


# GET single Area START
#Adding the requsted stand id in the url to recieve the categories of each stand
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getArea(request, area_id):
#     areas = Area.objects.all().filter(_id=area_id)
#     serializer = AreaSerializer(areas, many=True)
#     return Response(serializer.data)
# GET single Area END


# Delete
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delArea(request, area_id=0):
    area=Area.objects.get(_id=area_id)
    area.delete()
    return Response("Area Deleted Successfully")

# PUT
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updArea(request, area_id=0):
    print("@@@@@@@@@@@@@@@@",request.data,"@@@@@@@@@@@@@@@@")
    area=Area.objects.get(_id=area_id)
    area.areaName=request.data["areaName"]
    area.save()
    return Response ("Area Name Updated Successfully")
