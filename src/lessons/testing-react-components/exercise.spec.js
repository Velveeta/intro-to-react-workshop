import { mount, render, shallow } from 'enzyme';
import React from 'react';

import Exercise, { TestableComponent } from './exercise';

describe('Exercise', () => {
  describe('exports', () => {
    describe('default', () => {
      it('should be a function', () => {
        expect(typeof Exercise).toBe('function');
      });
    });
  });

  describe('component', () => {
    it('should mount without throwing an error by default', () => {
      fail(new Error('Implement me!'));
    });

    it(`should throw an error when passed a 'throwError' prop with value of true`, () => {
      fail(new Error('Implement me!'));
    });

    it('should render an instance of TestableComponent', () => {
      fail(new Error('Implement me!'));
    });

    it(`should render 'Hello World!' when passed a 'renderSomething' prop with value of true`, () => {
      fail(new Error('Implement me!'));
    });
  });
});

/*********************************************************************
 *         Don't look below here unless you want the answer!         *
 * Try your best, but if you get stuck, you have this to reflect on! *
 *********************************************************************/






























/**
 *  describe('component', () => {
 *    it('should mount without throwing an error by default', () => {
 *      expect(() => {
 *        mount(<Exercise />);
 *      }).not.toThrow();
 *    });
 *
 *    it(`should throw an error when passed a 'throwError' prop with value of true`, () => {
 *      // Suppress the error output from jsdom, since we're expecting this function to throw
 *      jest.spyOn(global.console, 'error').mockImplementation(() => jest.fn());
 *
 *      expect(() => {
 *        mount(<Exercise throwError={true} />);
 *      }).toThrow();
 *
 *      global.console.error.mockRestore();
 *    });
 *
 *    it('should render an instance of TestableComponent', () => {
 *      const component = shallow(<Exercise />);
 *
 *      expect(component.find(TestableComponent).length).toBe(1);
 *    });
 *
 *    it(`should render 'Hello World!' when passed a 'renderSomething' prop with value of true`, () => {
 *      const markup = render(<Exercise />);
 *
 *      expect(markup.text()).toEqual(expect.stringContaining('Hello World!'));
 *    });
 *  });
 **/
