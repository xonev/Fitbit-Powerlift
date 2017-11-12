import should from 'should';
import {build} from '../app/core/app';

describe('app module', function() {
    describe('newWorkout', function() {
        describe('with initial app state', function() {
            let state;

            before(function() {
                state = build({}).newWorkout();
            });

            it('creates a new, blank workout', function() {
                should(state.currentWorkout).deepEqual({
                    exercises: []
                });
            });
        });
    });
});