import unittest
from app.url_generator import UrlGenerator


class TestUrlGenerator(unittest.TestCase):

    def test_can_generate_url_for_single_part_artist_name(self):
        # Arrange
        name = 'test'
        expected_name = 'test.html'

        # Act
        url_generator_under_test = UrlGenerator()
        observed_name = url_generator_under_test.generate(name)

        # Assert
        self.assertIn(expected_name, observed_name)

    def test_can_generate_url_for_multi_part_artist_name(self):
        # Arrange
        name = 'test name'
        expected_name = 'test+name.html'

        # Act
        url_generator_under_test = UrlGenerator()
        observed_name = url_generator_under_test.generate(name)

        # Assert
        self.assertIn(expected_name, observed_name)