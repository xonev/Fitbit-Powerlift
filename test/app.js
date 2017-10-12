import should from 'should';
import {build} from '../app/core/app';

describe('app module', function() {
    describe('newWorkout', function() {
        describe('with initial app state', function() {
            let workout;

            before(function() {
                workout = build({}).newWorkout();
            });

            it('creates a new, blank workout', function() {
                should(workout).deepEqual({});
            });
        });
    });
});