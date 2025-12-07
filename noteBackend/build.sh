set -o errexit

pip install -r requirements.txt

python ./noteBackend/manage.py collectstatic --no-input

python ./noteBackend/manage.py migrate


# if [[ $CREATE_SUPERUSER ]]
# then
#     python manage.py createsuperuser --no-input
# fi
