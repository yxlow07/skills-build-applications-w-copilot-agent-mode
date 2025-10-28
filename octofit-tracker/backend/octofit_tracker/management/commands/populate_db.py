from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        Leaderboard.objects.all().delete()

        # Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Users
        tony = User.objects.create(name='Tony Stark', email='tony@marvel.com', team=marvel)
        steve = User.objects.create(name='Steve Rogers', email='steve@marvel.com', team=marvel)
        bruce = User.objects.create(name='Bruce Wayne', email='bruce@dc.com', team=dc)
        clark = User.objects.create(name='Clark Kent', email='clark@dc.com', team=dc)

        # Workouts
        w1 = Workout.objects.create(name='Super Strength', description='Heavy lifting', difficulty='Hard')
        w2 = Workout.objects.create(name='Flight Training', description='Aerial maneuvers', difficulty='Medium')

        # Activities
        Activity.objects.create(user=tony, type='Run', duration=30, calories=300, date=timezone.now())
        Activity.objects.create(user=steve, type='Swim', duration=45, calories=400, date=timezone.now())
        Activity.objects.create(user=bruce, type='Cycle', duration=60, calories=500, date=timezone.now())
        Activity.objects.create(user=clark, type='Fly', duration=20, calories=200, date=timezone.now())

        # Leaderboard
        Leaderboard.objects.create(team=marvel, points=700)
        Leaderboard.objects.create(team=dc, points=600)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))
