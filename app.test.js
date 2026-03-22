
// Mocks for DOM and globals before requiring app.js
const mockElement = {
    addEventListener: jest.fn(),
    classList: {
        add: jest.fn(),
        remove: jest.fn(),
        toggle: jest.fn()
    },
    style: {},
    appendChild: jest.fn(),
    innerHTML: '',
    textContent: '',
    closest: jest.fn()
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
    }),
    addEventListener: jest.fn()
};

global.Audio = jest.fn().mockImplementation(() => ({
    play: jest.fn(),
    pause: jest.fn(),
    load: jest.fn(),
    addEventListener: jest.fn(),
    src: ''
}));

global.window = {
    bodymovin: {
        loadAnimation: jest.fn().mockReturnValue({
            play: jest.fn(),
            stop: jest.fn()
        })
    }
};

global.bodymovin = global.window.bodymovin;

global.setInterval = jest.fn();

const { MusicPlayer } = require('./app');

describe('MusicPlayer', () => {
    let player;

    beforeEach(() => {
        jest.clearAllMocks();
        player = new MusicPlayer();
    });

    test('should initialize with first track', () => {
        expect(player.trackIndex).toBe(0);
        expect(player.currentTrack.src).toBe(player.trackList[0].path);
    });

    test('togglePlayPause should play if currently paused', () => {
        player.isPlaying = false;
        const playSpy = jest.spyOn(player.currentTrack, 'play');

        player.togglePlayPause();

        expect(playSpy).toHaveBeenCalled();
        expect(player.isPlaying).toBe(true);
    });

    test('togglePlayPause should pause if currently playing', () => {
        player.isPlaying = true;
        const pauseSpy = jest.spyOn(player.currentTrack, 'pause');

        player.togglePlayPause();

        expect(pauseSpy).toHaveBeenCalled();
        expect(player.isPlaying).toBe(false);
    });

    describe('nextTrack', () => {
        test('should increment trackIndex and call loadTrack and playTrack', () => {
            player.trackIndex = 0;
            const loadSpy = jest.spyOn(player, 'loadTrack');
            const playSpy = jest.spyOn(player, 'playTrack');

            player.nextTrack();

            expect(player.trackIndex).toBe(1);
            expect(loadSpy).toHaveBeenCalledWith(1);
            expect(playSpy).toHaveBeenCalled();
        });

        test('should wrap around to the first track when at the end of trackList', () => {
            player.trackIndex = player.trackList.length - 1;

            player.nextTrack();

            expect(player.trackIndex).toBe(0);
        });
    });

    describe('prevTrack', () => {
        test('should decrement trackIndex and call loadTrack and playTrack', () => {
            player.trackIndex = 1;
            const loadSpy = jest.spyOn(player, 'loadTrack');
            const playSpy = jest.spyOn(player, 'playTrack');

            player.prevTrack();

            expect(player.trackIndex).toBe(0);
            expect(loadSpy).toHaveBeenCalledWith(0);
            expect(playSpy).toHaveBeenCalled();
        });

        test('should wrap around to the last track when at the beginning of trackList', () => {
            player.trackIndex = 0;

            player.prevTrack();

            expect(player.trackIndex).toBe(player.trackList.length - 1);
        });
    });
});
