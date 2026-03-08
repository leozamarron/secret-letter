
// Mocks for DOM and globals before requiring app.js
const mockElement = {
    addEventListener: jest.fn(),
    classList: {
        add: jest.fn(),
        remove: jest.fn()
    },
    style: {},
    appendChild: jest.fn(),
    innerHTML: ''
};

global.document = {
    getElementById: jest.fn().mockReturnValue(mockElement),
    querySelector: jest.fn().mockReturnValue(mockElement),
    createElement: jest.fn().mockImplementation((tag) => {
        if (tag === 'audio') {
            return {
                play: jest.fn(),
                pause: jest.fn(),
                load: jest.fn(),
                addEventListener: jest.fn()
            };
        }
        return { ...mockElement };
    })
};

global.bodymovin = {
    loadAnimation: jest.fn().mockReturnValue({
        play: jest.fn(),
        stop: jest.fn()
    })
};

global.setInterval = jest.fn();

const app = require('./app');

describe('playPauseTrack', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call playTrack when isPlaying is false', () => {
        app.setIsPlaying(false);
        const currentTrack = app.getCurrentTrack();

        app.playPauseTrack();

        expect(currentTrack.play).toHaveBeenCalled();
        expect(app.getIsPlaying()).toBe(true);
    });

    test('should call pauseTrack when isPlaying is true', () => {
        app.setIsPlaying(true);
        const currentTrack = app.getCurrentTrack();

        app.playPauseTrack();

        expect(currentTrack.pause).toHaveBeenCalled();
        expect(app.getIsPlaying()).toBe(false);
    });
});
