import { getPackageNameFromThirdPartyPreset } from './get-third-party-preset';
import { CnwError } from '../error-utils';

describe('getPackageNameFromThirdPartyPreset', () => {
  it('should throw an error if preset is invalid', () => {
    expect(() => getPackageNameFromThirdPartyPreset('_random')).toThrow();
  });

  it('should throw a CnwError with INVALID_PRESET code for an invalid package name', () => {
    try {
      getPackageNameFromThirdPartyPreset('_random');
      fail('Expected CnwError to be thrown');
    } catch (e) {
      expect(e).toBeInstanceOf(CnwError);
      expect((e as CnwError).code).toBe('INVALID_PRESET');
    }
  });

  it('should return undefined if preset is known nx preset', () => {
    expect(getPackageNameFromThirdPartyPreset('react')).toBeUndefined();
    expect(getPackageNameFromThirdPartyPreset('angular')).toBeUndefined();
  });

  it('should return package name if it is valid package', () => {
    expect(getPackageNameFromThirdPartyPreset('@nx-go/nx-go')).toEqual(
      '@nx-go/nx-go'
    );
    expect(getPackageNameFromThirdPartyPreset('@nx-go/nx-go@19.0.0')).toEqual(
      '@nx-go/nx-go'
    );
  });
});
